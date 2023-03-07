<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'type' => intval($this->type),
            'typeText' => $this->getTypeText(intval($this->type)),
            'creatorId' => intval($this->creator_id),
            'adminCreated' => intval($this->admin_created),
            'unitId' => intval($this->unit_id),
            'subject' => Helper::localeNumbers($this->subject),
            'status' => intval($this->status),
            'statusText' => $this->getStatusText(intval($this->status)),
            'userSeenTime' => $this->user_seen_time,
            'faUserSeenTime' => Helper::faDate2($this->user_seen_time),
            'adminSeenTime' => $this->admin_seen_time,
            'faAdminSeenTime' => Helper::faDate2($this->admin_seen_time),
            'faCreatedAt' =>  Helper::localeNumbers(Helper::faDate($this->created_at)),
            'faUpdatedAt' =>  Helper::localeNumbers(Helper::faDate($this->updated_at)),
        ];
    }

    private function getTypeText(int $type)
    {
        $text = __('ticket.type_undefined');

        if ($type >= 1 && $type <= 5) {
            $text = __('ticket.type_' . $type);
        }

        return $text;
    }

    private function getStatusText(int $status)
    {
        $text = __('ticket.status_undefined');

        if ($status >= 1 && $status <= 2) {
            $text = __('ticket.status_' . $status);
        }

        return $text;
    }
}
