<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class cars extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'model', 'mark', 'year', 'doors', 'air', 'transmission', 'fuel','image'
    ];
}
