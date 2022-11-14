effect module Cool where { command = MyCmd, subscription = MySub } exposing (alert)

import AshCoreMod.Cool

type MySub msg = NeverSub
type MyCmd msg = NeverCmd

alert : String -> Cmd a
alert str =
  Elm.Kernel.Cool.alert str
