package util

import (
	"crypto/rand"
	"math/big"
	"fmt"
	"strings"
)


// String returns a random string n characters long, composed of entities
// from charset.
func String(n int, charset string) (string, error) {
	randstr := make([]byte, n) // Random string to return
	charlen := big.NewInt(int64(len(charset)))
	for i := 0; i < n; i++ {
		b, err := rand.Int(rand.Reader, charlen)
		if err != nil {
			return "", err
		}
		r := int(b.Int64())
		randstr[i] = charset[r]
	}
	return string(randstr), nil
}

func Merge(format string, v interface{}) string {
	var _format string

	switch v.(type) {
	case string:
		_r := strings.NewReplacer("?", "'%s'")
		_format = _r.Replace(format)
	default:
		_format = strings.Replace(format, "?", "%v", -1)
	}

	return fmt.Sprintf(_format, v)
}