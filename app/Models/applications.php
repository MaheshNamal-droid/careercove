<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class applications extends Model
{
    use HasFactory;
    protected $table = 'application';
    protected $fillable = ['user_id', 'job_id', 'profile_id', 'is_approved','status','created_at', 'updated_at','note'];

     // Define the relationship with the job_vacancy model
     public function job_vacancy()
     {
         return $this->belongsTo(job_vacancy::class, 'job_id', 'id');
     }
}

?>