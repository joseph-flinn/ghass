{
  description = "GitHub Actions Secret Syncer";
  inputs = { nixpkgs.url = "github:nixos/nixpkgs/22.11"; };

  outputs = { self, nixpkgs }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux.pkgs;
    in {
      devShells.x86_64-linux.default = pkgs.mkShell {
        name = "GitHub Actions Secret Syncer";
        buildInputs = [
          pkgs.nodejs
        ];
        shellHook = ''
          echo "Welcome in $name"
          export PS1="\[\e[1;33m\][nix(ghass)]\$\[\e[0m\] "
        '';
      };
    };
}
