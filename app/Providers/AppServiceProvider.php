<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::extend('trim_spaces', function ($attribute, $value, $parameters, $validator) {
            $trimmedValue = trim($value);
            return $trimmedValue === $value;
        });

        Validator::replacer('trim_spaces', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'The :attribute field cannot contain leading or trailing spaces.');
        });
    }
}
