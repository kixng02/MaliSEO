<?php
// Set content type to plain text for easier display in HTML <pre> tag
header('Content-Type: text/plain');

// Check if a university parameter was sent (optional, but good practice)
$universityId = isset($_POST['university']) ? htmlspecialchars($_POST['university']) : 'N/A';

echo "Received request for University: " . $universityId . "\n\n";

// Initialize cURL session
$ch = curl_init();

// Set the URL for the API request. Using a public API for demonstration.
// For example, fetching a list of todos from JSONPlaceholder.
$api_url = 'https://jsonplaceholder.typicode.com/todos/1'; // Fetching a single todo for simplicity

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response as a string instead of outputting it directly
curl_setopt($ch, CURLOPT_TIMEOUT, 10); // Set a timeout for the request in seconds

// Optional: If you need to send POST data with cURL
// curl_setopt($ch, CURLOPT_POST, true);
// curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(['key' => 'value']));

// Execute cURL request
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    echo "cURL Error: " . $error_msg . "\n";
} else {
    // Decode the JSON response
    $data = json_decode($response, true);

    if ($data) {
        echo "Data fetched successfully from external API:\n";
        print_r($data); // Print the array/object
    } else {
        echo "Failed to decode JSON response or empty response.\n";
        echo "Raw response: " . $response . "\n";
    }
}

// Close cURL session
curl_close($ch);

?>
