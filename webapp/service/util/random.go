package util

import (
	"fmt"
	"math/rand"
	"strconv"

	"io"
	"encoding/base64"
	"crypto/md5"
)

const (
	// Set of characters to use for generating random strings
	Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	Numerals = "1234567890"
	Alphanumeric = Alphabet + Numerals
	Ascii = Alphanumeric + "~!@#$%^&*()-_+={}[]\\|<,>.?/\"';:`"
)
const DefaultCharset = Alphanumeric + "!%@#"

//产生随机字符串，可用于密码/Token等
func RandomKey(tag string, lens ...int8) string {
	return tag + RandomString(30, Alphanumeric)
}

func RandomToken() string {
	return RandomString(64)
}

func RandomString(n int, defaultCharsets ...string) string {
	_charset := DefaultCharset
	if len(defaultCharsets) > 0 {
		_charset = defaultCharsets[0]
	}

	_result, err := String(n, _charset)
	if err != nil {
		fmt.Println("RandomString error:", err)
		return Md5(strconv.Itoa(rand.Intn(999999)))
	}

	return _result
}

func Md5(text string) string {
	hashMd5 := md5.New()
	io.WriteString(hashMd5, text)
	return fmt.Sprintf("%x", hashMd5.Sum(nil))
}

func Md5Buf(buf []byte) string {
	hashMd5 := md5.New()
	hashMd5.Write(buf)
	return fmt.Sprintf("%x", hashMd5.Sum(nil))
}

func Md5File(reader io.Reader) string {
	var buf = make([]byte, 4096)
	hashMd5 := md5.New()
	for {
		n, err := reader.Read(buf)
		if err == io.EOF && n == 0 {
			break
		}
		if err != nil && err != io.EOF {
			break
		}

		hashMd5.Write(buf[:n])
	}

	return fmt.Sprintf("%x", hashMd5.Sum(nil))
}

func Base64Encode(data string) string {
	return base64.URLEncoding.EncodeToString([]byte(data))
}

func Base64Decode(data string) string {
	b, err := base64.URLEncoding.DecodeString(data)
	if err != nil {
		return ""
	}
	return string(b)
}

