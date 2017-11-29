from setuptools import setup

setup(name='bigdiveintesa',
      version='0.4',
      description='A very basic intesa application',
      url='http://github.com/MYACCOUNT/MYREPOSITORY',
      author='Alex Comu',
      author_email='alex.comunian@top-ix.org',
      license='MIT',
      packages=['bigdiveintesa'],
      install_requires=['pandas', 'requests'],
      entry_points={
         'console_scripts': [
                'bigdiveintesa = bigdiveintesa.main:main'
         ]
      },
      zip_safe=False)

