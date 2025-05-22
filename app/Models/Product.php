<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    protected $fillable = [
        'product_type_id',
        'products_name',
        'description',
        'price',
        'stock',
        'img_url',
        'img_name',
    ];

    function category() 
    {
        return self::belongsTo(ProductType::class, 'product_type_id', 'id');
        
    }
}
