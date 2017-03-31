

function State(Base) {

    return class State extends Base {

        constructor(spec) {
            super(spec);
            this.name = spec.Name;
            this.type = spec.Type;
            this.comment = spec.Comment;
            this.next = spec.Next;
        }

        run(data) {
            const defaults = { next: this.next };

            const merge = result => {
                return Object.assign(defaults, result);
            };

            const unwrap = error => {
                if (error instanceof Error) {
                    error = {
                        Error: error.message,
                        Cause: error.stack,
                    };
                }
                const result = merge({ output: error });
                return Promise.reject(result);
            };

            return this._run(data).then(merge, unwrap);
        }

        _run(input) {
            return Promise.reject({ Error: 'Not implemented.' });
        }

    };

}


module.exports = State;
