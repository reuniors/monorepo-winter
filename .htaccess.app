<IfModule mod_rewrite.c>

    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    # Dozvoli symlinkove ako su isti vlasnik (potrebno za cPanel)
    Options +SymLinksIfOwnerMatch

    RewriteEngine On

    ##
    ## You may need to uncomment the following line for some hosting environments,
    ## if you have installed to a subdirectory, enter the name here also.
    ##
    # RewriteBase /

    ##
    ## Uncomment following lines to force HTTPS.
    ##
    # RewriteCond %{HTTPS} off
    # RewriteRule (.*) https://%{SERVER_NAME}/$1 [L,R=301]
 ##
     ##
    ## You may need to uncomment the following line for some hosting environments,
    ## if you have installed to a subdirectory, enter the name here also.
    ##
    # RewriteBase /

    RewriteEngine On
    RewriteBase /

    RewriteCond %{REMOTE_ADDR} !^(127\.0\.0\.1|::1|192\.168\.|10\.0\.|172\.16\.) [NC]
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

    ##
    ## Uncomment following lines to force HTTPS.
    ##
    RewriteCond %{REMOTE_ADDR} !^(127\.0\.0\.1|::1|192\.168\.|10\.0\.|172\.16\.) [NC]
    RewriteCond %{HTTPS} off
    RewriteRule (.*) https://%{SERVER_NAME}/$1 [L,R=301]

    ## Authorization header
    ##
    RewriteCond %{HTTP:Authorization} ^(.*)
    RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
    
    
    ##
    ## Paths explicitly blocked from being handled by the server
    ##
    RewriteRule ^bootstrap/.* index.php [L,NC]
    RewriteRule ^config/.* index.php [L,NC]
    RewriteRule ^vendor/.* index.php [L,NC]
    RewriteRule ^storage/cms/.* index.php [L,NC]
    RewriteRule ^storage/logs/.* index.php [L,NC]
    RewriteRule ^storage/framework/.* index.php [L,NC]
    RewriteRule ^storage/temp/protected/.* index.php [L,NC]
    RewriteRule ^storage/app/uploads/protected/.* index.php [L,NC]

    ##
    ## Paths explicitly handled by the server
    ##
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteCond %{REQUEST_FILENAME} !/.well-known/*
    RewriteCond %{REQUEST_FILENAME} !/storage/app/uploads/public/.*
    RewriteCond %{REQUEST_FILENAME} !/storage/app/media/.*
    RewriteCond %{REQUEST_FILENAME} !/storage/app/resized/.*
    RewriteCond %{REQUEST_FILENAME} !/storage/temp/public/.*
    RewriteCond %{REQUEST_FILENAME} !/themes/.*/(assets|resources)/.*
    RewriteCond %{REQUEST_FILENAME} !/plugins/.*/(assets|resources)/.*
    RewriteCond %{REQUEST_FILENAME} !/modules/.*/(assets|resources)/.*
    RewriteCond %{REQUEST_FILENAME} !/app/.*
    RewriteRule !^index.php index.php [L,NC]

    ##
    ## Block all PHP files, except index
    ##
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteCond %{REQUEST_FILENAME} \.php$
    RewriteRule !^index.php index.php [L,NC]

    ##
    ## Standard routes
    ##
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]

</IfModule>
