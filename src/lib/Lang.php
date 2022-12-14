<?php

namespace lib;

class Lang
{
    public const DIRECTORY = __DIR__ . '/../../lang';

    public const ALL = [
        'en' => 'en-US',
        'es' => 'es-ES',
        'fr' => 'fr-FR',
    ];

    public function load() : void
    {
        $language = http_negotiate_language(self::ALL);
        echo $language;
    }

    public function translate() : void
    {

    }
}