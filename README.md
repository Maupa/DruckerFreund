# Drucker Freund

Helfen Sortierung Drucker Scheiße seit 2015. 

## WHAT IS IT?!

Drucker Freund(Printer Buddy) - is a combination of leading technologies in OSX scripting and lazy admins.
Its a web app that generates scripts for installing printers for OSX.

## API
All configs are stored in JSON format, in `data/` folder.

### `printers.json`
```js
[
	{
		//Printers name - the way user sees
		"name": "The Engineering Library Copier",

		//Printer Queue name - the way network sees (Optional)
		"qname": "Engi_Library_LL239",

		//Location of the printer (Optional)
		"location": "Engineering Library",

		//Group name for sorting purposes. Used in selecting menu. (Optional)
		"group": "Libraries",

		//The name of the driver. Drivers are stored in drivers.json
		"driver": "FX550"
	}
]
```

### `drivers.json`
```js
[
	{
		//Name of the driver
		"name":"FX550",

		//The name of the driver package in /Library/Printers/PPDs/Contents/Resources/
		"location":"en.lproj/Xerox 550-560 Integrated Fiery"

	}
]
```

## ToDo:
 - change default colour https://unix.stackexchange.com/questions/18323/how-do-i-make-blackwhite-the-default
 - change default printer