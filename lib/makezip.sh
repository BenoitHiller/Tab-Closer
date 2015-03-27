#1/bin/bash
find . -not -path "*.git*" -type f | grep -vE "LICENSE|banner|README|.svg|jasmine|lib.zip|attribution|SpecRunner|.pem|spec|.zip|makezip.sh" | zip tab-closer.zip -@
