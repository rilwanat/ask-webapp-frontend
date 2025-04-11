<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit41d4560a565f7964f25d303b330aa1a4
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
        1 => 
        array (
            '10101110\\V1\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
        '10101110\\V1\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit41d4560a565f7964f25d303b330aa1a4::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit41d4560a565f7964f25d303b330aa1a4::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit41d4560a565f7964f25d303b330aa1a4::$classMap;

        }, null, ClassLoader::class);
    }
}
