# Generated by Django 2.1.1 on 2018-10-11 08:52

from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='menuitem',
            managers=[
                ('tree', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AddField(
            model_name='menuitem',
            name='publication',
            field=models.BooleanField(default=True, verbose_name='Публиковать?'),
        ),
        migrations.AlterField(
            model_name='menuitem',
            name='menu',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.MenuItem', verbose_name='Menu'),
        ),
        migrations.DeleteModel(
            name='Menu',
        ),
    ]
