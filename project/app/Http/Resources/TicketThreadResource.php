<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketThreadResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'ticketId' => intval($this->ticket_id),
            'creatorId' => intval($this->creator_id),
            'creatorName' => Helper::localeNumbers($this->creator_name),
            'creatorFamily' => Helper::localeNumbers($this->creator_family),
            'adminCreated' => intval($this->admin_created),
            'content' => Helper::localeNumbers($this->content),
            'userSeenTime' => $this->user_seen_time,
            'faUserSeenTime' => Helper::faDate2($this->user_seen_time),
            'adminSeenTime' => $this->admin_seen_time,
            'faAdminSeenTime' => Helper::faDate2($this->admin_seen_time),
            'file' => $this->file ?? null,
            'faCreatedAt' =>  Helper::localeNumbers(Helper::faDate($this->created_at)),
        ];
    }
}
