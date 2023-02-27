# need to use on server (ubuntu)

## порядок запуска на сервере

### as root

	apt install nginx git python3-pip mc -y
	adduser stm
	usermod -aG sudo stm

### as stm user

	pip install --upgrade pip
	pip install virtualenvwrapper
	mkdir -p ~/Env

	echo "export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3" >> ~/.bashrc
	echo "export WORKON_HOME=~/Env" >> ~/.bashrc
	echo "source ~/.local/bin/virtualenvwrapper.sh" >> ~/.bashrc
	source ~/.bashrc
	mkvirtualenv stm

## ssh settings

	sudo mkdir /home/stm/.ssh/
	sudo chmod 0700 /home/stm/.ssh/
	sudo -- sh -c "echo '***ssh-public-key***' > /home/stm/.ssh/authorized_keys"
	sudo chown -R stm:stm /home/stm/.ssh/

	sudo nano /etc/ssh/sshd_config.d/disable_root_login.conf
	```
	Port # Replace port 22 with a port between 1024 and 65536.
	PermitRootLogin no
	PubkeyAuthentication yes
	PasswordAuthentication no
	```

	ufw allow # New port
	service sshd restart

## init project
	git clone https://github.com/jenia0jenia/stm.git
	cd stm
	pip install -r requirements.txt

	(stm) $ python manage.py collectstatic
	(stm) $ python manage.py thumbnail cleanup

# runing on local machine

порядок запуска на локальной машине

## webpack
	sudo apt install npm node webpack

## npm

	npm run dev
	npm run build
	npm run watch

## django server (in another terminal)
	workon stm
	python manage.py runserver

## translations
	django-admin makemessages -a
	django-admin compilemessages
