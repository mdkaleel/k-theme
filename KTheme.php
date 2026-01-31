<?php

declare(strict_types=1);

namespace WebtreesModules\KTheme;

use Fisharebest\Webtrees\I18N;
use Fisharebest\Webtrees\Module\MinimalTheme;
use Fisharebest\Webtrees\Module\ModuleConfigInterface;
use Fisharebest\Webtrees\Module\ModuleConfigTrait;
use Fisharebest\Webtrees\Validator;
use Fisharebest\Webtrees\FlashMessages;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Fisharebest\Webtrees\Module\ModuleCustomInterface;
use Fisharebest\Webtrees\Module\ModuleCustomTrait;
use Fisharebest\Webtrees\View;

class KTheme extends MinimalTheme implements ModuleCustomInterface, ModuleConfigInterface
{
    use ModuleCustomTrait;
    use ModuleConfigTrait;

    public function title(): string
    {
        return I18N::translate('K-Theme');
    }

    public function description(): string
    {
        return I18N::translate('A modern, premium theme with light and dark palettes.');
    }

    public function customModuleAuthorName(): string
    {
        return 'Kaleel';
    }

    public function customModuleVersion(): string
    {
        return '1.0.0';
    }

    public function customModuleSupportUrl(): string
    {
        return '';
    }

    public function resourcesFolder(): string
    {
        return __DIR__ . '/resources/';
    }

    public function stylesheets(): array
    {
        return [
            $this->assetUrl('css/k-theme.base.css'),
            $this->assetUrl('css/k-theme.icons.css'),
            $this->assetUrl('css/k-theme.light.css'),
            $this->assetUrl('css/k-theme.dark.css'),
            $this->assetUrl('css/k-theme.login.css'),
        ];
    }

    public function scripts(): array
    {
        return [
            $this->assetUrl('js/k-theme.js'),
        ];
    }

    public function palettes(): array
    {
        return [
            'light' => I18N::translate('Light'),
            'dark' => I18N::translate('Dark'),
        ];
    }

    public function defaultPalette(): string
    {
        return $this->getPreference('default_palette', 'light');
    }

    public function boot(): void
    {
        parent::boot();

        View::registerNamespace($this->name(), __DIR__ . '/resources/views/');

        View::registerCustomView('::layouts/default', $this->name() . '::layouts/default');
        View::registerCustomView('::auth/login', $this->name() . '::auth/login');
    }

    public function getAdminAction(ServerRequestInterface $request): ResponseInterface
    {
        $this->layout = 'layouts/administration';

        return $this->viewResponse($this->name() . '::admin/config', [
            'title'            => $this->title(),
            'default_palette'  => $this->getPreference('default_palette', 'light'),
            'module'           => $this,
        ]);
    }

    public function postAdminAction(ServerRequestInterface $request): ResponseInterface
    {
        $palette = Validator::parsedBody($request)->string('default_palette');
        $palette = in_array($palette, ['light', 'dark'], true) ? $palette : 'light';

        $this->setPreference('default_palette', $palette);

        $message = I18N::translate('The preferences for the module “%s” have been updated.', $this->title());
        FlashMessages::addMessage($message, 'success');

        return redirect($this->getConfigLink());
    }
}
