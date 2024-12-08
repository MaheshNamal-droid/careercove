<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_profile extends Model
{
    use HasFactory;
    protected $table = 'user_profile';
    protected $fillable = ['user_id', 'first_name', 'last_name', 'email', 'address', 'contact_phone', 'social_media', 'profile_picture', 'resume', 'description', 'status'];
}