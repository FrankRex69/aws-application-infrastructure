export const validateevent = {
  otherInput: {
    NewImage: {
        readyTimestamp: {N: 123456789},
        pollId: {N: 12},
        name: {S: "manche 1"},
        applicationId: {N: 567},
        participants: {
          L: [
           {
            M: {
             participantId: {
              N: 2
             },
             name: {
              S: "BALTIMORA"
             },
             tag: {
              S: "Band"
             },
             pollOptionId: {
              N: 0
             }
            }
           },
           {
            M: {
             participantId: {
              N: 18
             },
             name: {
              S: "VERSAILLES"
             },
             tag: {
              S: "Singer"
             },
             pollOptionId: {
              N: 1
             }
            }
           }
          ]
        }                   
      }
    }
  }

  export const axiosResponse = 	{
    status: 200,
    statusText: 'OK',
    headers: {
      date: 'Mon, 01 Aug 2022 17:08:24 GMT',
      'content-type': 'application/json',
      'content-length': '730',
      connection: 'close'
    },
    config: {
      transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
      },
      adapter: "httpAdapter",
      transformRequest: [ "transformRequest" ],
      transformResponse: [ "transformResponse" ],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1,
      maxBodyLength: -1,
      env: { FormData: "Function" },
      validateStatus: ["validateStatus"],
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'text/xml',
        'User-Agent': 'axios/0.27.2',
        'Content-Length': 3979
      },
      method: 'post',
      url: 'http://10.39.223.130:8088/wireTap/XFactor',
      data: '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n' +
        '  <soapenv:Header/>\n' +
        '  <soapenv:Body>\n' +
        '    <ns1:update soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="urn:publisher">\n' +
        '      <in0 xsi:type="soapenc:string" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">X_FACTOR</in0>\n' +
        '      <in1 soapenc:arrayType="ns1:Data[1]" xsi:type="soapenc:Array" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/">\n' +
        '        <ini href="#id0" />\n' +
        '        </in1>\n' +
        '    </ns1:update>\n' +
        '    <multiRef id="id0" soapenc:root="0" soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xsi:type="ns2:Data" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns2="urn:publisher">\n' +
        '      <id xsi:type="soapenc:string">VOTING</id>\n' +
        '      <xml xsi:type="soapenc:string">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;\n' +
        '&lt;ParticipationEvents xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot; xsi:noNamespaceSchemaLocation=&quot;ParticipationEvents.xsd&quot;&gt;\n' +
        '  &lt;ParticipationEvent id=&quot;3868&quot; type=&quot;Poll&quot; status=&quot;on&quot;&gt;\n' +
        '    &lt;DateGenerated&gt;1659373704091&lt;/DateGenerated&gt;\n' +
        '    &lt;Polls Count=&quot;1&quot;&gt;\n' +
        '      &lt;Poll Count=&quot;12&quot; DateCreated=&quot;MON 01.08.2022&quot; ID=&quot;999&quot;&gt;\n' +
        '        &lt;PollTitle&gt;episodeTestReview&lt;/PollTitle&gt;\n' +
        '        &lt;PollText&gt;566&lt;/PollText&gt;\n' +
        '        &lt;Alternative ID=&quot;1&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;1&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;1&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;2&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;2&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;2&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;3&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;3&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;3&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;4&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;4&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;4&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;5&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;5&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;5&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;6&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;6&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;6&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;7&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;7&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;7&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;8&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;8&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;8&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;9&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;9&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;9&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;10&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;10&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;10&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;11&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;11&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;11&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '        &lt;Alternative ID=&quot;12&quot;&gt;\n' +
        '          &lt;AlternativeText&gt;12&lt;/AlternativeText&gt;\n' +
        '          &lt;PollOptionID&gt;12&lt;/PollOptionID&gt;\n' +
        '        &lt;/Alternative&gt;\n' +
        '      &lt;/Poll&gt;\n' +
        '    &lt;/Polls&gt;\n' +
        '  &lt;/ParticipationEvent&gt;\n' +
        '&lt;/ParticipationEvents&gt;\n' +
        '      </xml>\n' +
        '    </multiRef>\n' +
        '  </soapenv:Body>\n' +
        '</soapenv:Envelope>'
    },
    request: <"ref *1"> ClientRequest {
      _events: [Object: null prototype] {
        abort: [Function (anonymous)],
        aborted: [Function (anonymous)],
        connect: [Function (anonymous)],
        error: [Function (anonymous)],
        socket: [Function (anonymous)],
        timeout: [Function (anonymous)],
        prefinish: [Function: requestOnPrefinish]
      },
      _eventsCount: 7,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
      _last: true,
      chunkedEncoding: false,
      shouldKeepAlive: false,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: false,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: true,
      _headerSent: true,
      socket: Socket {
        connecting: false,
        _hadError: false,
        _parent: null,
        _host: null,
        _readableState: [ReadableState],
        _events: [Object: null prototype],
        _eventsCount: 7,
        _maxListeners: undefined,
        _writableState: [WritableState],
        allowHalfOpen: false,
        _sockname: null,
        _pendingData: null,
        _pendingEncoding: '',
        server: null,
        _server: null,
        parser: null,
        _httpMessage: [Circular *1],
        [Symbol(async_id_symbol)]: 4,
        [Symbol(kHandle)]: [TCP],
        [Symbol(kSetNoDelay)]: false,
        [Symbol(lastWriteQueueSize)]: 0,
        [Symbol(timeout)]: null,
        [Symbol(kBuffer)]: null,
        [Symbol(kBufferCb)]: null,
        [Symbol(kBufferGen)]: null,
        [Symbol(kCapture)]: false,
        [Symbol(kBytesRead)]: 0,
        [Symbol(kBytesWritten)]: 0,
        [Symbol(RequestTimeout)]: undefined
      },
      _header: 'POST /wireTap/XFactor HTTP/1.1\r\n' +
        'Accept: application/json, text/plain, */*\r\n' +
        'Content-Type: text/xml\r\n' +
        'User-Agent: axios/0.27.2\r\n' +
        'Content-Length: 3979\r\n' +
        'Host: 10.39.223.130:8088\r\n' +
        'Connection: close\r\n' +
        '\r\n',
      _keepAliveTimeout: 0,
      _onPendingData: [Function: noopPendingOutput],
      agent: Agent {
        _events: [Object: null prototype],
        _eventsCount: 2,
        _maxListeners: undefined,
        defaultPort: 80,
        protocol: 'http:',
        options: [Object],
        requests: {},
        sockets: [Object],
        freeSockets: {},
        keepAliveMsecs: 1000,
        keepAlive: false,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        scheduling: 'lifo',
        maxTotalSockets: Infinity,
        totalSocketCount: 1,
        [Symbol(kCapture)]: false
      },
      socketPath: undefined,
      method: 'POST',
      maxHeaderSize: undefined,
      insecureHTTPParser: undefined,
      path: '/wireTap/XFactor',
      _ended: true,
      res: IncomingMessage {
        _readableState: [ReadableState],
        _events: [Object: null prototype],
        _eventsCount: 4,
        _maxListeners: undefined,
        socket: [Socket],
        httpVersionMajor: 1,
        httpVersionMinor: 1,
        httpVersion: '1.1',
        complete: true,
        headers: [Object],
        rawHeaders: [Array],
        trailers: {},
        rawTrailers: [],
        aborted: false,
        upgrade: false,
        url: '',
        method: null,
        statusCode: 200,
        statusMessage: 'OK',
        client: [Socket],
        _consuming: false,
        _dumped: false,
        req: [Circular *1],
        responseUrl: 'http://10.39.223.130:8088/wireTap/XFactor',
        redirects: [],
        [Symbol(kCapture)]: false,
        [Symbol(RequestTimeout)]: undefined
      },
      aborted: false,
      timeoutCb: null,
      upgradeOrConnect: false,
      parser: null,
      maxHeadersCount: null,
      reusedSocket: false,
      host: '10.39.223.130',
      protocol: 'http:',
      _redirectable: Writable {
        _writableState: [WritableState],
        _events: [Object: null prototype],
        _eventsCount: 3,
        _maxListeners: undefined,
        _options: [Object],
        _ended: true,
        _ending: true,
        _redirectCount: 0,
        _redirects: [],
        _requestBodyLength: 3979,
        _requestBodyBuffers: [],
        _onNativeResponse: [Function (anonymous)],
        _currentRequest: [Circular *1],
        _currentUrl: 'http://10.39.223.130:8088/wireTap/XFactor',
        [Symbol(kCapture)]: false
      },
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: [Object: null prototype] {
        accept: [Array],
        'content-type': [Array],
        'user-agent': [Array],
        'content-length': [Array],
        host: [Array]
      }
    },
    data: '<?xml version="1.0" encoding="UTF-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soapenv:Body><ns1:updateResponse soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns1="urn:publisher"><updateReturn href="#id0"/></ns1:updateResponse><multiRef id="id0" soapenc:root="0" soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xsi:type="ns2:Response" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:ns2="urn:publisher"><exit xsi:type="xsd:int">0</exit><description xsi:type="soapenc:string">Ok</description></multiRef></soapenv:Body></soapenv:Envelope>'
  }
  