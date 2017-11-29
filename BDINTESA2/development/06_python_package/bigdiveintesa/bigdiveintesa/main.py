from configparser import ConfigParser
import argparse, os

def parse_input():
    parser = argparse.ArgumentParser()
    parser.add_argument("config_file", 
                        type=str, 
                        help="Configuration File")
    return parser.parse_args()

def exec_main():
    parsed_input = parse_input()
    parser = ConfigParser()
    parser.read(os.path.expanduser(parsed_input.config_file))
    print 'Reading Configuration..'
    print parser.get('hello', 'world')
    print parser.get('intesa', 'python')

def main():
    print 'Welcome to my new package'
    exec_main()


