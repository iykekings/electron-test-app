package main

import (
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/gen2brain/dlgs"
)

// The aim of this application is to launch the real Electron application.
// It must successfully transfer environment variables through to the real Electron application.

var LAUNCH_FILE_NAME = "electron" // Filename of electron application (it must sit alongside launcher)

func main() {

	thisApplicationFullPath, err := os.Executable()
	if err != nil {
		dlgs.Error("error", err.Error())
		os.Exit(1)
	}

	// The launcher must always be placed alongside the electron executable file
	appPath := filepath.Dir(thisApplicationFullPath)

	exePath := filepath.Join(appPath, LAUNCH_FILE_NAME)
	if runtime.GOOS == "windows" && !strings.HasSuffix(exePath, ".exe") {
		exePath = exePath + ".exe"
	}

	// Pass command line arguments to launch app
	cmd := exec.Command(exePath, os.Args[1:]...)

	// Load secrets into environment variables
	envvars := []string{
		"username=abc",
		"password=password_test",
	}
	cmd.Env = append(os.Environ(), envvars...)

	///////////////
	// Execute file

	err = cmd.Start()
	if err != nil {
		dlgs.Error("error", err.Error())
		os.Exit(2)
	}
	os.Exit(0)

}

// NOTES:
//
// https://grokbase.com/t/gg/golang-nuts/147jmc4h0k/go-nuts-starting-detached-child-process
// https://stackoverflow.com/questions/23031752/start-a-process-in-go-and-detach-from-it
