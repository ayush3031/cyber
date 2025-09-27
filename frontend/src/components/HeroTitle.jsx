import { Button, Container, Group, Text } from '@mantine/core';
import classes from '../styles/HeroTitle.module.css'

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          An intelligent platform to {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            detect and stop phishing attacks
          </Text>{' '}
          
        </h1>

        <Text className={classes.description} mt="14px" color="dimmed">
          Check your mailbox for phishing , paste any mail to get started instantly.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            component="a"
            href="#paste-mail"
          >
            Get started
          </Button>

          {/*<Button
            size="xl"
            variant="default"
            className={classes.control}
            
          >
            SignUp
          </Button>*/}
        </Group>
      </Container>
    </div>
  );
}