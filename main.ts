import get from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/get.js";
import axios, { AxiosHeaders } from "npm:axios@^1.6.2";
import xmljs from "npm:xml-js";


// usage of module
const xml = await Deno.readFile('./zip-code-envelope.xml');
const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php'
const headers = new AxiosHeaders({
  'user-agent': 'sampleTest',
  'Content-Type': 'text/xml;charset=UTF-8',
  'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
})

const res = await axios(url, { headers, data: xml, method: 'POST' })
console.log(res.status)

const doc = xmljs.xml2js(res.data, { compact: true })
const latlonXMLString = get(doc, 'SOAP-ENV:Envelope.SOAP-ENV:Body.ns1:LatLonListZipCodeResponse.listLatLonOut._text')
const latlonDoc = xmljs.xml2js(latlonXMLString, { compact: true })
const latlonString: string = get(latlonDoc, 'dwml.latLonList._text')
const [lat, lon] = latlonString.split(',').map((s: string) => parseFloat(s))

console.log({ latlonString, lat, lon })
