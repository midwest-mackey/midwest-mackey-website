import pkgApp from 'package.json';
// import pkgLogos from '@ux/logos/package.json';
// import pkgFA from '@fortawesome/fontawesome-svg-core/package.json';
// import pkgBootstrap from 'bootstrap/package.json';

export class GlobalConstants {
    // URLs
    public static githubBaseURL: string = 'https://github.com/midwest-mackey';
    public static linkedinURL: string = 'https://www.linkedin.com/in/calebmackey';
    public static twitchURL: string = 'https://m.twitch.tv/midwestmackey/home';
    public static instagramURL: string = 'https://www.instagram.com/midwest.mackey/';
    public static bmcURL: string = 'https://www.buymeacoffee.com/midwestmackey';
    public static discordURL: string = 'https://discord.gg/zp8FNHUewS';
    public static tiktokURL: string = 'https://www.tiktok.com/@midwest.mackey?_t=ZT-8u7Bm4i0kuc&_r=1';
    public static youtubeURL: string = 'https://youtube.com/@midwestmackey';
    public static redditURL: string = 'https://www.reddit.com/user/cpattymack/';
    public static playstationURL: string = 'https://profile.playstation.com/midwestmackey';
    public static fortniteTrackerURL: string = 'https://fortnitetracker.com/profile/all/midwest.mackey';
    public static linkstackURL: string = 'https://stack.midwestmackey.com/';
    public static statusURL: string = 'https://stats.uptimerobot.com/oWvEXLAYAm';

    // Email
    public static emailAddress: string = 'midwestmackey@gmail.com';

    // Versions
    public static appVersion: string = 'v'+pkgApp.version;
    public static uxLogosVersion: string = 'v1.0.0';
    public static uxIconsVersion: string = 'v0.0.0';
    public static fontAwesomeVersion: string = 'v1.0.0';
    // public static fontAwesomeVersion: string = 'v'+pkgFA.version;
    // public static uxBootstrapVersion: string = 'v'+pkgBootstrap.version;
}
