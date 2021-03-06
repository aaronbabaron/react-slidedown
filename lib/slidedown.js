"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var TransitionGroup_1 = tslib_1.__importDefault(require("./TransitionGroup/TransitionGroup"));
var SlideDownContent = (function (_super) {
    tslib_1.__extends(SlideDownContent, _super);
    function SlideDownContent(props) {
        var _this = _super.call(this, props) || this;
        _this.handleTransitionEnd = function (evt) {
            if (evt.target === _this.outerRef.current && evt.propertyName === "height") {
                var callback = _this.callbacks.shift();
                callback && callback();
                if (_this.callbacks.length === 0) {
                    _this.outerRef.current.classList.remove("transitioning");
                    _this.outerRef.current.style.transitionProperty = "none";
                    _this.outerRef.current.style.height = _this.props.closed ? "0px" : "auto";
                    if (_this.props.closed) {
                        _this.outerRef.current.classList.add("closed");
                    }
                }
            }
        };
        _this.outerRef = props.forwardedRef || react_1.default.createRef();
        _this.callbacks = [];
        return _this;
    }
    SlideDownContent.prototype.componentDidMount = function () {
        if (this.props.closed) {
            this.outerRef.current.classList.add("closed");
        }
    };
    SlideDownContent.prototype.componentWillAppear = function (callback) {
        if (this.props.transitionOnAppear) {
            this.callbacks.push(callback);
            this.startTransition("0px");
        }
        else {
            this.outerRef.current.style.height = this.props.closed ? "0px" : "auto";
            callback();
        }
    };
    SlideDownContent.prototype.componentWillEnter = function (callback) {
        this.callbacks.push(callback);
        var prevHeight = this.outerRef.current.getBoundingClientRect().height + "px";
        this.startTransition(prevHeight);
    };
    SlideDownContent.prototype.componentWillLeave = function (callback) {
        this.callbacks.push(callback);
        this.outerRef.current.classList.add("transitioning");
        this.outerRef.current.style.height = getComputedStyle(this.outerRef.current).height;
        this.outerRef.current.offsetHeight;
        this.outerRef.current.style.transitionProperty = "height";
        this.outerRef.current.style.height = "0px";
    };
    SlideDownContent.prototype.getSnapshotBeforeUpdate = function () {
        if (this.callbacks.length === 0) {
            return this.outerRef.current.getBoundingClientRect().height + "px";
        }
        else {
            return null;
        }
    };
    SlideDownContent.prototype.componentDidUpdate = function (_prevProps, _prevState, snapshot) {
        var callback = this.callbacks.shift();
        callback && callback();
        if (this.callbacks.length === 0) {
            var prevHeight = snapshot || getComputedStyle(this.outerRef.current).height;
            this.startTransition(prevHeight);
        }
    };
    SlideDownContent.prototype.startTransition = function (prevHeight) {
        var endHeight = "0px";
        if (!this.props.closed) {
            this.outerRef.current.classList.remove("closed");
            this.outerRef.current.style.height = "auto";
            endHeight = getComputedStyle(this.outerRef.current).height;
        }
        if (parseFloat(endHeight).toFixed(2) !== parseFloat(prevHeight).toFixed(2)) {
            this.outerRef.current.classList.add("transitioning");
            this.outerRef.current.style.height = prevHeight;
            this.outerRef.current.offsetHeight;
            this.outerRef.current.style.transitionProperty = "height";
            this.outerRef.current.style.height = endHeight;
        }
    };
    SlideDownContent.prototype.render = function () {
        var className = this.props.className
            ? "react-slidedown " + this.props.className
            : "react-slidedown";
        return (react_1.default.createElement("div", { className: className, ref: this.outerRef, onTransitionEnd: this.handleTransitionEnd }, this.props.children));
    };
    SlideDownContent.defaultProps = {
        transitionOnAppear: true,
        closed: false
    };
    return SlideDownContent;
}(react_1.default.Component));
function TransitionGroupWrapper(props) {
    var childrenArray = react_1.default.Children.toArray(props.children);
    return childrenArray[0] || null;
}
var SlideDownComponent = function (props) {
    var children = props.children, attrs = tslib_1.__rest(props, ["children"]);
    var hasContent = children && react_1.default.Children.count(children) !== 0;
    return (react_1.default.createElement(TransitionGroup_1.default, null, children && react_1.default.createElement(SlideDownContent, tslib_1.__assign({}, attrs), children)));
};
exports.SlideDown = react_1.default.memo(react_1.default.forwardRef(function (props, ref) { return (react_1.default.createElement(SlideDownComponent, tslib_1.__assign({}, props, { forwardedRef: ref }))); }));
exports.default = exports.SlideDown;
//# sourceMappingURL=slidedown.js.map