/*

import Dict exposing (empty, update)
import Elm.Kernel.Scheduler exposing (binding, fail, rawSpawn, succeed)
import Elm.Kernel.Utils exposing (Tuple2)
import Fetch exposing (BadUrl_, Timeout_, NetworkError_, BadStatus_, GoodStatus_, Sending, Receiving)
import Maybe exposing (Just, Nothing, isJust)
import Platform exposing (sendToApp, sendToSelf)
import Result exposing (map, isOk)

*/


// SEND REQUEST

var _Fetch_toTask = F3(function(router, toTask, request)
{
  return __Scheduler_binding(function(callback)
  {
    function done(response) {
      callback(toTask(request.__$expect.__toValue(response)));
    }

    alert("requestin' it");
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('error', function() { done(__Fetch_NetworkError_); });
    xhr.addEventListener('timeout', function() { done(__Fetch_Timeout_); });
    xhr.addEventListener('load', function() { done(_Fetch_toResponse(request.__$expect.__toBody, xhr)); });
    __Maybe_isJust(request.__$tracker) && _Fetch_track(router, xhr, request.__$tracker.a);

    try {
      xhr.open(request.__$method, request.__$url, true);
    } catch (e) {
      return done(__Fetch_BadUrl_(request.__$url));
    }

    _Fetch_configureRequest(xhr, request);

    request.__$body.a && xhr.setRequestHeader('Content-Type', request.__$body.a);
    xhr.send(request.__$body.b);

    return function() { xhr.__isAborted = true; xhr.abort(); };
  });
});


// CONFIGURE

function _Fetch_configureRequest(xhr, request)
{
  for (var headers = request.__$headers; headers.b; headers = headers.b) // WHILE_CONS
  {
    xhr.setRequestHeader(headers.a.a, headers.a.b);
  }
  xhr.timeout = request.__$timeout.a || 0;
  xhr.responseType = request.__$expect.__type;
  xhr.withCredentials = request.__$allowCookiesFromOtherDomains;
}


// RESPONSES

function _Fetch_toResponse(toBody, xhr)
{
  return A2(
    200 <= xhr.status && xhr.status < 300 ? __Fetch_GoodStatus_ : __Fetch_BadStatus_,
    _Fetch_toMetadata(xhr),
    toBody(xhr.response)
  );
}


// METADATA

function _Fetch_toMetadata(xhr)
{
  return {
    __$url: xhr.responseURL,
    __$statusCode: xhr.status,
    __$statusText: xhr.statusText,
    __$headers: _Fetch_parseHeaders(xhr.getAllResponseHeaders())
  };
}


// HEADERS

function _Fetch_parseHeaders(rawHeaders)
{
  if (!rawHeaders)
  {
    return __Dict_empty;
  }

  var headers = __Dict_empty;
  var headerPairs = rawHeaders.split('\r\n');
  for (var i = headerPairs.length; i--; )
  {
    var headerPair = headerPairs[i];
    var index = headerPair.indexOf(': ');
    if (index > 0)
    {
      var key = headerPair.substring(0, index);
      var value = headerPair.substring(index + 2);

      headers = A3(__Dict_update, key, function(oldValue) {
        return __Maybe_Just(__Maybe_isJust(oldValue)
          ? value + ', ' + oldValue.a
          : value
        );
      }, headers);
    }
  }
  return headers;
}


// EXPECT

var _Fetch_expect = F3(function(type, toBody, toValue)
{
  return {
    $: 0,
    __type: type,
    __toBody: toBody,
    __toValue: toValue
  };
});

var _Fetch_mapExpect = F2(function(func, expect)
{
  return {
    $: 0,
    __type: expect.__type,
    __toBody: expect.__toBody,
    __toValue: function(x) { return func(expect.__toValue(x)); }
  };
});

function _Fetch_toDataView(arrayBuffer)
{
  return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Fetch_emptyBody = { $: 0 };
var _Fetch_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Fetch_toFormData(parts)
{
  for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
  {
    var part = parts.a;
    formData.append(part.a, part.b);
  }
  return formData;
}

var _Fetch_bytesToBlob = F2(function(mime, bytes)
{
  return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Fetch_track(router, xhr, tracker)
{
  // TODO check out lengthComputable on loadstart event

  xhr.upload.addEventListener('progress', function(event) {
    if (xhr.__isAborted) { return; }
    __Scheduler_rawSpawn(A2(__Platform_sendToSelf, router, __Utils_Tuple2(tracker, __Fetch_Sending({
      __$sent: event.loaded,
      __$size: event.total
    }))));
  });
  xhr.addEventListener('progress', function(event) {
    if (xhr.__isAborted) { return; }
    __Scheduler_rawSpawn(A2(__Platform_sendToSelf, router, __Utils_Tuple2(tracker, __Fetch_Receiving({
      __$received: event.loaded,
      __$size: event.lengthComputable ? __Maybe_Just(event.total) : __Maybe_Nothing
    }))));
  });
}