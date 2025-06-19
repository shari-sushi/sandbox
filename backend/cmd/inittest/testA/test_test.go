package testA_test

import (
	"sandbox/cmd/inittest/testA"
	"testing"
)

func TestTest1(t *testing.T) {
	tests := []struct {
		name    string
		want    int
		resulet bool
	}{
		// TODO: Add test cases.
		{"成功:53が返る", 53, true},
		{"失敗:initが働いてない場合は0が返る", 0, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := testA.Test1(); got != tt.want {
				t.Errorf("Test1() = %v, want %v", got, tt.want)
			}
		})
	}
}

// 結果
// Running tool: /usr/bin/go test -timeout 30s -run ^TestTest1$ sandbox/cmd/inittest/testA

// --- FAIL: TestTest1 (0.00s)
//     --- FAIL: TestTest1/失敗:initが働いてない場合は0が返る (0.00s)
//         /home/shari-sushi/private/sounbox/cmd/inittest/testA/test_test.go:21: Test1() = 53, want 0
// FAIL
// FAIL	sandbox/cmd/inittest/testA	0.001s
// FAIL
