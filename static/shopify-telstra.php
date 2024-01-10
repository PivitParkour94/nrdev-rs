<?php

/*
This is a quick, cheap and dirty solution to get some leads asap. Will be able to refine it later
 */

/** Utility to record lead details that need help with Telstra's DNS blocking of Shopify stores */
class ShopifyTelstraUnblocker {

    /**
     * Simply record the lobby request in a file on the server
     */
    public function recordLobbyRequest() {
        // $file = '/var/www/request-data/shopify/'.date('dmYhS').'.json';
        // if (!is_dir(dirname($file))) {
            // mkdir(dirname($file));
        // }
        try {
            $data = [
                'email' => $_POST['email'], 
                'domain' => $_POST['domain']
            ];

            mail("nathaniel+php@nrdev.au","Shopify Telstra Unblock Me",json_encode($data));


            // file_put_contents($file, json_encode($data));
        }
        catch (\Exception $ex) {
            $data['error'] = $ex->getMessage();
            mail("nathaniel+php@nrdev.au","Shopify Telstra Unblock Me - request failed",json_encode($data));
        }
        // header('test', true, 200);
        // echo json_encode(['response' => 'success']);
        // return 1;
    }
}

if (empty($_POST)) {
    echo "No post info sent";
    exit(2);
}

$unblocker = new ShopifyTelstraUnblocker();
$unblocker->recordLobbyRequest();

