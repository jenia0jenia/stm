# stm
	в директории с manage.py
	mkdir media_cdn media static static_cdn

	в директории media_cdn (MEDIA_ROOT)
	mkdir uploads

# New env
	sudo -H pip3 install --upgrade pip
	sudo -H pip3 install virtualenv virtualenvwrapper

	echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> ~/.bashrc
	echo "export WORKON_HOME=~/Env" >> ~/.bashrc
	echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bashrc
	source ~/.bashrc
	mkvirtualenv stm

# webpack
	sudo apt install npm node webpack

# issues
	https://github.com/froala/django-froala-editor/issues/55

	# clear media cache
	python manage.py thumbnail cleanup

# runing
	npm run-script dev
	npm run-script build
	npm run-script watch

	and in another terminal

	workon stm
	python manage.py runserver

# translateions
	django-admin makemessages -a
	django-admin compilemessages


# robots.txt using by nginx