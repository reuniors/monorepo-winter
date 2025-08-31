<?php namespace reuniors\questionnaire\Http\Actions\V1\Questionnaire\Email;

use Lorisleiva\Actions\Concerns\AsAction;
use Reuniors\Questionnaire\Models\QuestionnaireRegistration;
use Mail;

class SendEmailQuestionnaireCode
{
    use asAction;

    public function rules()
    {
        return [
            'code' => 'required',
            'email' => 'required|email',
        ];
    }

    public function sendEmail($code, $email)
    {
        $data = [
            'url' => url('/') . 'app/questionnaire/location/list/' . $code . '/new',
            'urlName' => 'Link za Upitnik',
        ];

        Mail::send('reuniors.knk::mail.location_questionnaire', $data, function($message) use ($email) {

            $message->to($email, 'Kuda na klopu');
//            $message->subject('Upitnik za restorane');

        });

        return [
            'success' => true,
        ];
    }

    public function handle($attributes = [])
    {
        $code = $attributes['code'];
        $email = $attributes['email'];

        QuestionnaireRegistration::where('code', $code)
            ->firstOrFail();

        $this->sendEmail($code, $email);


        return [
            'success' => true,
        ];
    }

    public function asController()
    {
        $requestData = request()->all();
        return $this->handle($requestData);
    }
}
