<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class ContactUs extends Notification
{
    use Queueable;
    public $name;
    public $email;
    public $phone;
    public $message;
    public $bccEmails;
    /**
     * Create a new notification instance.
     */
    public function __construct($name, $email, $phone, $message, $bccEmails)
    {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->message = $message;
        $this->bccEmails = $bccEmails;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject(Lang::get('Careercove'))
        ->greeting('Hi..')
        ->line('Name: '.$this->name)
        ->line('Emali: '.$this->email)
        ->line('Contact Number: '.$this->phone)
        ->line('Message '. $this->message)
        ->bcc($this->bccEmails);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
