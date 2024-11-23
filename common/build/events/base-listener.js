"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
var Listener = /** @class */ (function () {
    function Listener(client) {
        this.ackWait = 5000;
        this.client = client;
    }
    Listener.prototype.subscriptionOptions = function () {
        return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setDeliverAllAvailable()
            .setAckWait(this.ackWait)
            .setDurableName("".concat(this.queueGroupName, "-durable-name"));
    };
    Listener.prototype.listen = function () {
        var _this = this;
        var stan = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        stan.on("message", function (msg) {
            console.log("Received event: #".concat(_this.subject, " / ").concat(_this.queueGroupName));
            var parsedMsg = _this.parseMessage(msg);
            _this.onMessage(parsedMsg, msg);
            // msg.ack();
        });
    };
    Listener.prototype.parseMessage = function (msg) {
        var data = msg.getData();
        return typeof data === "string" ? data : JSON.parse(data.toString("utf-8"));
    };
    return Listener;
}());
exports.Listener = Listener;
