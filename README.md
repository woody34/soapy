# Soapy

A sample of an interaction with a soap API. 

# What it does

1. create an "envelope" with your api inputs.
2. using the WSDL, determine what api action you would like to perform.
3. make a request to the soap api setting your action in the headers and passing your envelope input in the body of the post request/
4. api returns xml in response.
5. parse xml with results.