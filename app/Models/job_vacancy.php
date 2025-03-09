<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class job_vacancy extends Model
{
    use HasFactory;
    protected $table = 'job_vacancy';
    protected $fillable = ['user_id', 'title','job_category', 'description', 'requirement', 'location', 'files', 'company_name', 'company_logo', 'closing_date', 'contact_phone', 'contact_email', 'address', 'status','view_count','city','full_or_part_time'];

    // Define the relationship between JobVacancy and Review
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
