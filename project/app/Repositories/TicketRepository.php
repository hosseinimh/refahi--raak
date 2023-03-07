<?php

namespace App\Repositories;

use App\Interfaces\TicketRepositoryInterface;
use App\Models\Ticket as Model;
use App\Models\TicketThread;

class TicketRepository extends Repository implements TicketRepositoryInterface
{
    public function get(int $id): mixed
    {
        return Model::where('id', $id)->first();
    }

    public function paginate(int $unitId, int $page, int $pageItems): mixed
    {
        return Model::select('tbl_tickets.*', 'tbl_ticket_threads.user_seen_time', 'tbl_ticket_threads.admin_seen_time')->leftJoin('tbl_ticket_threads', function ($join) {
            $join->on('tbl_tickets.id', '=', 'tbl_ticket_threads.ticket_id')->whereRaw('`tbl_ticket_threads`.`id` IN (SELECT MAX(`threads`.`id`) FROM `tbl_ticket_threads` AS `threads` JOIN `tbl_tickets` AS `tickets` ON `threads`.`ticket_id`=`tickets`.`id`)');
        })->where('unit_id', $unitId)->groupBy('tbl_tickets.id')->orderBy('tbl_tickets.updated_at', 'DESC')->orderBy('tbl_tickets.id', 'DESC')->orderBy('tbl_ticket_threads.id', 'DESC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function threads(int $ticketId): mixed
    {
        return TicketThread::select('tbl_ticket_threads.*', 'tbl_users.name AS creator_name', 'tbl_users.family AS creator_family')->join('tbl_users', 'tbl_ticket_threads.creator_id', '=', 'tbl_users.id')->where('ticket_id', $ticketId)->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->get();
    }

    public function store(int $unitId, int $type, int $creatorId, int $adminCreated, string $subject, string $content, int $status): mixed
    {
        $thread = null;
        $data = [
            'type' => $type,
            'creator_id' => $creatorId,
            'admin_created' => $adminCreated,
            'unit_id' => $unitId,
            'subject' => $subject,
            'status' => $status,
        ];
        $model = Model::create($data);

        if ($model) {
            $data = [
                'ticket_id' => $model->id,
                'creator_id' => $creatorId,
                'content' => $content,
                'admin_seen_time' => $adminCreated === 1 ? date('Y-m-d H:i:s') : null,
                'user_seen_time' => $adminCreated === 1 ? null : date('Y-m-d H:i:s'),
                'admin_created' => $adminCreated,
            ];
            $thread = TicketThread::create($data);
        }

        return $thread ?? null;
    }

    public function storeThread(int $ticketId, int $creatorId, int $adminCreated, string $content): mixed
    {
        $data = [
            'ticket_id' => $ticketId,
            'creator_id' => $creatorId,
            'content' => $content,
            'admin_seen_time' => $adminCreated === 1 ? date('Y-m-d H:i:s') : null,
            'user_seen_time' => $adminCreated === 1 ? null : date('Y-m-d H:i:s'),
            'admin_created' => $adminCreated,
        ];
        $thread = TicketThread::create($data);

        return $thread ?? null;
    }

    public function seen(int $id, bool $isAdmin): bool
    {
        $result = $isAdmin ?
            TicketThread::query()->where('ticket_id', $id)->update(['admin_seen_time' => date('Y-m-d H:i:s')])
            : TicketThread::query()->where('ticket_id', $id)->update(['user_seen_time' => date('Y-m-d H:i:s')]);

        return $result;
    }

    public function changeStatus(Model $model, int $status): bool
    {
        $data = [
            'status' => $status,
        ];

        return $model->update($data);
    }

    public function countUnseen(int $unitId): int
    {
        return TicketThread::query()->join('tbl_tickets', 'tbl_ticket_threads.ticket_id', '=', 'tbl_tickets.id')->where('unit_id', $unitId)->whereNull('user_seen_time')->count();
    }

    public function countAllUnseen(): int
    {
        return TicketThread::query()->join('tbl_tickets', 'tbl_ticket_threads.ticket_id', '=', 'tbl_tickets.id')->whereNull('admin_seen_time')->count();
    }
}
