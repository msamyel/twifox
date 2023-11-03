
const r = httpTracker.browser.webRequest;

r.onCompleted.addListener(
    function(details) {
        details.callerName = 'onCompleted';
        details.requestIdEnhanced = details.requestId;
        eventTracker.logRequestDetails(details);
    }, trackUrls, resHeaders,
);

chrome.action.setPopup({popup: 'popup/popup.html'});