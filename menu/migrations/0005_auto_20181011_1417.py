# Generated by Django 2.1.1 on 2018-10-11 09:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0004_auto_20181011_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menuitem',
            name='name',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Имя'),
        ),
    ]
