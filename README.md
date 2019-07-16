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

# issues
	https://github.com/froala/django-froala-editor/issues/55

	# clear media cache
	python manage.py thumbnail cleanup
