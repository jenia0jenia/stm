# Generated by Django 2.1.1 on 2018-09-29 07:05

from django.db import migrations, models
import django.db.models.deletion
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('theatre', '0008_auto_20180928_1950'),
    ]

    operations = [
        migrations.AddField(
            model_name='role',
            name='description',
            field=tinymce.models.HTMLField(blank=True, verbose_name='О роли'),
        ),
        migrations.AlterField(
            model_name='artist',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='uploads/artist/', verbose_name='Аватар'),
        ),
        migrations.AlterField(
            model_name='role',
            name='spectacles',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='theatre.Spectacle', verbose_name='Спектакль'),
        ),
    ]
