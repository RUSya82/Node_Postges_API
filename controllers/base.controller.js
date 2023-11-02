export class BaseController {
    send(res, code, message) {
        res.type('application/json');
        return res.status(code).json(message);
    }

    created(res, message) {
        return this.send(res, 201, { status: 'ok', message });
    }

    ok(res, message) {
        return this.send(res, 200, { status: 'ok', message });
    }

    error(res, message, code = 404) {
        return this.send(res, code, { status: 'error', message });
    }

}