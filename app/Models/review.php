<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class review extends Model
{
    use HasFactory;
    protected $table = 'review';
    protected $fillable = ['user_id','job_id','text', 'status'];

     // Define the relationship between Review and JobVacancy
     public function jobVacancy()
     {
         return $this->belongsTo(JobVacancy::class, 'job_id');
     }
}

