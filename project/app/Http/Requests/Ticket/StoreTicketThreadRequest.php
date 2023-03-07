<?php

namespace App\Http\Requests\Ticket;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreTicketThreadRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'content' => 'required|min:10|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'content.required' => __('ticket.content_required'),
            'content.min' => __('ticket.content_min'),
            'content.max' => __('ticket.content_max'),
        ];
    }
}
