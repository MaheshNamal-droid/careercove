<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_category extends Model
{
    use HasFactory;
    protected $table = 'job_category';
    protected $fillable = ['id', 'title', 'description', 'status'];

    // Define the relationship between JobVacancy and Review
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
