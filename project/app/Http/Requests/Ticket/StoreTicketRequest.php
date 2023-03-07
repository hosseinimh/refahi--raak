<?php

namespace App\Http\Requests\Ticket;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreTicketRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'type' => 'required|numeric|min:1|max:5',
            'subject' => 'required|min:10|max:200',
            'content' => 'required|min:10|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'type.required' => __('ticket.type_required'),
            'type.numeric' => __('ticket.type_numeric'),
            'type.min' => __('ticket.type_min'),
            'type.max' => __('ticket.type_max'),
            'subject.required' => __('ticket.subject_required'),
            'subject.min' => __('ticket.subject_min'),
            'subject.max' => __('ticket.subject_max'),
            'content.required' => __('ticket.content_required'),
            'content.min' => __('ticket.content_min'),
            'content.max' => __('ticket.content_max'),
        ];
    }
}
