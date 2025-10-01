# マルチステージビルド
#### ビルドステージ ####
FROM golang:1.22.5-alpine AS builder

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# C言語との統合を防いで少しでも軽くする…らしい
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/main.go

#### 実行ステージ ####
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# 重要：ビルドされたmainのみをコピー
COPY --from=builder /build/main .

EXPOSE 8080

CMD ["./main"]