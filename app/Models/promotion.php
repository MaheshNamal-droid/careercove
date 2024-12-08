<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class promotion extends Model
{
    use HasFactory;
    protected $table = 'promotion';
    protected $fillable = ['user_id', 'ads_image', 'description', 'text','status'];
}

?>