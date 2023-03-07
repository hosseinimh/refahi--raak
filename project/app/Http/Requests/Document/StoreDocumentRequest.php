<?php

namespace App\Http\Requests\Document;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class StoreDocumentRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::FORM_INPUT_INVALID], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'title' => 'required|min:3|max:50',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => __('documents.title_required'),
            'title.min' => __('documents.title_min'),
            'title.max' => __('documents.title_max'),
        ];
    }
}
