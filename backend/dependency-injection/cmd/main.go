package main

import (
	"fmt"
	"os"
	// "sandbox/app"
)

func main() {
	// 環境変数から実行環境を判定（デフォルトは本番環境）
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "production"
	}

	fmt.Printf("=== %s環境での実行 ===\n", env)

	// // ファクトリー関数で環境に応じた依存性注入
	// application := app.NewAppWithEnvironment(env)

	// // データ処理を実行
	// if err := application.ProcessData("サンプルデータ"); err != nil {
	// 	log.Fatal("エラー:", err)
	// }
}

// 動作確認
// go run cmd/main.go                    # 本番環境
// APP_ENV=test go run cmd/main.go       # テスト環境
// go test ./app/                        # テスト実行
// go test -v ./app/                     # 詳細テスト実行
