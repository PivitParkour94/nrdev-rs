FROM rust:1 as builder
WORKDIR /usr/src/myapp
COPY ./src/ .
RUN cargo install --path .
CMD ["myapp"]

# FROM debian:buster-slim as runner
# COPY --from=builder /usr/local/cargo/bin/nrdev-rs /usr/local/bin/nrdev-rs
# ENV ROCKET_ADDRESS=0.0.0.0
# EXPOSE 9000
# CMD ["nrdev-rs"]