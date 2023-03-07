<?php

namespace App\Interfaces;

use App\Models\Ticket as Model;

interface TicketRepositoryInterface
{
    public function get(int $id): mixed;
    public function paginate(int $unitId, int $page, int $pageItems): mixed;
    public function threads(int $ticketId): mixed;
    public function store(int $unitId, int $type, int $creatorId, int $adminCreated, string $subject, string $content, int $status): mixed;
    public function storeThread(int $ticketId, int $creatorId, int $adminCreated, string $content): mixed;
    public function seen(int $id, bool $isAdmin): bool;
    public function changeStatus(Model $ticket, int $status): bool;
    public function countUnseen(int $unitId): int;
    public function countAllUnseen(): int;
}
