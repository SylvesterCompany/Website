<?php
/**
 * @author F1D0
 * @date 12/14/2022
 * @copyright GNU Public License
 */

declare(strict_types=1);

namespace src\lib;

use function in_array;
use function json_decode;
use function substr;
use function file_get_contents;

class Lang
{
    /** @var string DIRECTORY STORING ALL TRANSLATIONS */
    private const DIRECTORY = __DIR__ . '/../../lang';

    /** @var string[] ALL SUPPORTED LANGUAGES */
    private const SUPPORTED = [
        'en',
        'es',
        'fr'
    ];

    /** @var string DEFAULT LANGUAGE */
    private const DEFAULT = 'en';

    /** @var string $lang current user's language */
    private string $lang;

    /**
     * Obtain language from browser's Accept Languages HTTP Request
     */
    public function __construct()
    {
        $this->lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) ?? self::DEFAULT;
    }

    /**
     * Get the translation from json file
     *
     * @param string $index
     * @return array
     */
    public function translate(string $index = 'header') : array
    {
        $file = self::DIRECTORY . '/' . $this->getLang() . '/' . $index . '.json';
        return json_decode(file_get_contents($file), true);
    }

    /**
     * Get the current language
     *
     * @return string
     */
    public function getLang(): string
    {
        return $this->isLang() ? $this->lang : self::DEFAULT;
    }

    /**
     * Check if the current language is known
     *
     * @return bool
     */
    public function isLang() : bool
    {
        return $this->lang == self::DEFAULT ||
            in_array($this->lang, self::SUPPORTED);
    }
}